import Link from 'next/link'
import clsx from 'clsx'

function ButtonInner({
  arrow = false,
  children,
}: {
  arrow?: boolean
  children: React.ReactNode
}) {
  return (
    <>
      <span className="absolute inset-0 rounded-md bg-gradient-to-b from-white/80 to-white opacity-10 transition-opacity group-hover:opacity-15 dark:from-white/80 dark:to-white dark:opacity-10" />
      <span className="absolute inset-0 rounded-md opacity-7.5 shadow-[inset_0_1px_1px_white] transition-opacity group-hover:opacity-10" />
      {children} {arrow ? <span aria-hidden="true">&rarr;</span> : null}
    </>
  )
}

export function Button({
  className,
  arrow,
  children,
  ...props
}: { arrow?: boolean } & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | ({ href?: undefined } & React.ComponentPropsWithoutRef<'button'>)
)) {
  className = clsx(
    className,
    'group relative isolate flex-none rounded-md py-1.5 text-[0.8125rem]/6 font-semibold text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 bg-white/90 dark:bg-transparent',
    arrow ? 'pl-2.5 pr-[calc(9/16*1rem)]' : 'px-2.5',
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </button>
  ) : (
    <Link className={className} {...props}>
      <ButtonInner arrow={arrow}>{children}</ButtonInner>
    </Link>
  )
}
