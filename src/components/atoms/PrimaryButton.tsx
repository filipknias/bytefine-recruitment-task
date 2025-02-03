import clsx from "clsx";

type Props = React.ComponentPropsWithoutRef<'button'> & {
    children: React.ReactNode;
}

export default function PrimaryButton({ children, className, ...restProps }: Props) {
    return (
        <button 
            className={clsx(className, "bg-primary cursor-pointer py-2 px-8 rounded-sm text-white font-semibold text-button transition duration-150 hover:bg-primary-dark focus:ring-2 focus:ring-primary-50 disabled:bg-black-25 disabled:pointer-events-none")} 
            {...restProps}
        >
            {children}
        </button>
    )
}
