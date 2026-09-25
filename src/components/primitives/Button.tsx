import { Link } from 'react-router-dom';
import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'overlay' | 'on-dark' | 'solid';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'btn-primary', secondary: 'btn-secondary', accent: 'btn-accent',
  ghost: 'btn-ghost', overlay: 'btn-overlay', 'on-dark': 'btn-on-dark', solid: 'btn-solid',
};
const SIZE: Record<ButtonSize, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

interface Common { variant?: ButtonVariant; size?: ButtonSize; block?: boolean; children: ReactNode; className?: string }

export function Button({ variant = 'primary', size = 'md', block, className, ...rest }: Common & ComponentProps<'button'>) {
  return <button className={cx('btn', VARIANT[variant], SIZE[size], block && 'btn-block', className)} {...rest} />;
}

export function ButtonLink({ to, variant = 'primary', size = 'md', block, className, ...rest }: Common & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'className'>) {
  return <Link to={to} className={cx('btn', VARIANT[variant], SIZE[size], block && 'btn-block', className)} {...rest} />;
}
