import { Component, ComponentProps, ParentProps, children } from "solid-js";

import { VariantProps, tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "inline-flex justify-center rounded-xl border border-transparent px-4 py-2 text-sm font-bold tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  variants: {
    colorScheme: {
      primary:
        "text-white bg-violet-600 hover:bg-violet-500 focus-visible:ring-violet-50",
      secondary:
        "bg-violet-100 text-violet-900 hover:bg-violet-200 focus-visible:ring-violet-500",
    },
  },
  defaultVariants: {
    colorScheme: "primary",
  },
});

export const Button: Component<
  ParentProps<ComponentProps<"button"> & VariantProps<typeof buttonStyles>>
> = (props) => {
  const c = children(() => props.children);
  return (
    <button
      type="button"
      class={buttonStyles({
        colorScheme: props.colorScheme,
        class: props.class,
      })}
      {...props}
    >
      {c()}
    </button>
  );
};
