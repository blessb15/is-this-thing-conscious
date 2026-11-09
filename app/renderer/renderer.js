const $ = (id) => document.getElementById(id);
const views = ["home", "sample", "done", "mirror"];
const show = (v) => views.forEach((x) => $(x).classList.toggle("hidden", x !== v));

// ---------- home ----------
async function refresh() {
  const s = await window.api.getSettings();
  $("start").value = s.start; $("end").value = s.end; $("count").value = s.count;
  $("name").value = s.name; $("enabled").checked = s.enabled;
  const st = await window.api.getStatus();
  $("remaining").textContent = st.enabled ? st.remainingToday : "off";
  $("total").textContent = st.samplesTotal;
}
$("save").onclick = async () => {
  await window.api.saveSettings({
    start: $("start").value, end: $("end").value, count: $("count").value,
    name: $("name").value.trim() || "me", enabled: $("enabled").checked,
  });
  $("saved").textContent = "Saved. Today's remaining beeps were re-drawn.";
  setTimeout(() => ($("saved").textContent = ""), 3000);
  refresh();
};
$("test").onclick = () => window.api.testAlarm();
$("export").onclick = () => window.api.exportSamples();

// ---------- sample ----------
let current = null; // { at, deadline, test, firstKeyAt, answers }
let timer = null;

window.api.onAlarm((a) => {
  current = { ...a, firstKeyAt: null, answers: { senses: [] } };
  $("describe").value = "";
  $("describe").readOnly = false;
  $("step1").classList.remove("hidden");
  $("step2").classList.add("hidden");
  document.querySelectorAll(".q button").forEach((b) => b.classList.remove("on"));
  $("submit").disabled = true;
  $("testTag").classList.toggle("hidden", !a.test);
  show("sample");
  $("describe").focus();
  clearInterval(timer);
  timer = setInterval(tickTimer, 250);
  tickTimer();
});

function tickTimer() {
  if (!current) return;
  const left = current.deadline - Date.now();
  if (left <= 0) return drop();
  const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
  $("countdown").textContent = `${m}:${String(s).padStart(2, "0")}`;
  $("countdown").classList.toggle("low", left < 30000);
}

$("describe").addEventListener("input", () => {
  if (current && current.firstKeyAt === null) current.firstKeyAt = Date.now();
});

// Guard: the note is locked before the structured questions appear, so they can't reshape it.
$("next").onclick = () => {
  if (!$("describe").value.trim()) return $("describe").focus();
  $("describe").readOnly = true;
  $("lockedNote").textContent = $("describe").value.trim();
  $("step1").classList.add("hidden");
  $("step2").classList.remove("hidden");
};

document.querySelectorAll(".q").forEach((q) => {
  const key = q.dataset.key;
  const multi = q.hasAttribute("data-multi");
  q.querySelectorAll("button").forEach((b) => {
    b.onclick = () => {
      if (!current) return;
      if (multi) {
        b.classList.toggle("on");
        current.answers[key] = [...q.querySelectorAll("button.on")].map((x) => x.dataset.v);
      } else {
        q.querySelectorAll("button").forEach((x) => x.classList.remove("on"));
        b.classList.add("on");
        current.answers[key] = b.dataset.v;
      }
      const need = ["words", "unbidden", "self", "feeling", "absorbed", "state"];
      $("submit").disabled = !need.every((k) => current.answers[k]);
    };
  });
});

$("submit").onclick = async () => {
  if (!current) return;
  const a = current.answers;
  const firstKey = current.firstKeyAt ?? Date.now();
  const res = await window.api.saveSample({
    at: current.at,
    minutesToRecord: (firstKey - Date.parse(current.at)) / 60000,
    describe: $("describe").value.trim(),
    words: a.words, senses: a.senses, unbidden: a.unbidden, self: a.self,
    feeling: a.feeling, absorbed: a.absorbed, state: a.state,
  });
  finish(res.ok ? (res.test ? ["Test done.", "Nothing was saved."] : ["Saved.", "Back to whatever you were doing."]) : ["Dropped.", res.reason]);
};

function drop() {
  window.api.dropSample();
  finish(["Dropped.", "The 3 minutes ran out, so this beep isn't in your log. That's fine: a missed beep is better than a reconstructed one."]);
}

function finish([title, text]) {
  clearInterval(timer);
  current = null;
  $("doneTitle").textContent = title;
  $("doneText").textContent = text;
  show("done");
  refresh();
}
$("back").onclick = () => show("home");

// ---------- mirror ----------
$("openMirror").onclick = async () => {
  const m = await window.api.getMirror();
  $("warnings").replaceChildren(...m.warnings.map((w) => Object.assign(document.createElement("li"), { textContent: w })));
  $("lines").replaceChildren(...m.lines.map((l) => {
    const d = document.createElement("div");
    d.className = "line";
    const c = Object.assign(document.createElement("div"), { className: "check", textContent: l.check });
    const p = Object.assign(document.createElement("p"), { textContent: m.usable ? l.reported : "No moments yet." });
    d.append(c, p);
    return d;
  }));
  show("mirror");
};
$("mirrorBack").onclick = () => show("home");

refresh();
setInterval(refresh, 60000);
