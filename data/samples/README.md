# Experience samples

Anyone can sample their own experience and get a report back from the method.

## How to sample

1. Set 3–5 alarms at **random** times in a day (not on the hour, not when you expect them).
2. When one goes off, stop and answer **question 1 first**, in your own words, before reading the rest:
   1. What was in your experience the instant before the alarm?
   2. Were there words in it? none / inner speech / heard / reading / unsure
   3. Which senses were present? sight, sound, body, touch, smell, taste
   4. Was anything there that you didn't put there? yes / no / unsure
   5. Was there a sense of "I" in it? yes / no / unsure
   6. How did it feel? pleasant / neutral / unpleasant / none
   7. Were you absorbed in what you were doing? yes / partly / no
3. Note how many minutes passed before you wrote, and whether you were sober or in an altered state.

Describe **the instant before**, not the general mood of the day. "I don't know" and "unsure" are good answers.

## Adding samples

Each experiencer has a file, `<name>.json`, holding an array of samples (see the `Sample` type in `src/sampling.ts`). Blake can just send the answers to Claude, who adds them.

## Reading your mirror

```
npm run mirror -- blake
```

The mirror reports what you *reported*, linked to the method's checks. It isn't a verdict about your mind. It needs 10+ usable samples before patterns mean much.
