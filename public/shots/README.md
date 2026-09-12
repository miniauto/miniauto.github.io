# Screenshots

One folder per mini, named with the mini's `id` from `src/data/minis.ts`.

```
public/shots/click-tooling/bid-room.png
public/shots/click-tooling/dispatch.png
```

Then point the entry at it:

```ts
screenshots: [
  {
    src: '/shots/click-tooling/bid-room.png',
    alt: 'The bid room with the labor tab open',
    caption: 'One bid, fourteen tabs.',
  },
],
```

Notes:

- `src` always starts with `/shots/`, never `public/`. Vite serves this
  folder from the root.
- `alt` describes the image for screen readers. `caption` is the visible
  line under it and can be empty.
- Leave `screenshots: []` if you do not have a real shot yet. The section
  hides itself. Do not ship a placeholder.
- Aim for about 1200px wide PNG or JPG. They are lazy-loaded, but every
  file here ships with the site, so keep them reasonable.
