# Border Glow

The FLAGSHIP IP site uses the football project's **Border Glow**, adapted in
`src/flagship/home/ui/MetalBorder.tsx` and `metal-border.css`. To request this
specific treatment, call it **football-style Border Glow**.

- Purple, pink and cyan light stays on the 1 px ring. The button fill and content
  keep their existing design.
- The ring appears as the pointer approaches the control's edge, following its
  angle. Leaving fades the light out; there is no continuous idle animation.
- Reduced motion uses a static ring on hover or focus. Disabled controls hide
  the ring; forced colors uses the control's native focus and border styles.
- Existing IP buttons and links share this component. The footer's large country
  link applies it only to its circular arrow through `data-metal-surface`.

Tune the brightness and fade timing in `metal-border.css`. Pointer angle and
edge distance remain in the delegated `useMetalBorder.ts` handler; pointer
updates do not rerender React.
