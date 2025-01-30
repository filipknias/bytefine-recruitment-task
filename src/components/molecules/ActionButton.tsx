type Props = {
    disabled?: boolean;
    icon: string;
    text: string;
}

export default function ActionButton({ disabled = false, icon, text }: Props) {
    return (
        <button 
            className="px-12 pb-3 pt-12 w-full cursor-pointer rounded-xl bg-white-secondary flex flex-col items-center justify-end hover:bg-black-25 focus:ring-4 focus:ring-primary-50 disabled:opacity-25 disabled:pointer-events-none transititon duration-150" 
            disabled={disabled}
        >
            <img 
                className="mx-auto h-24 mb-8"
                src={icon} 
                alt="action-button-icon" 
            />
            <p className="text-center font-medium text-body text-black-100">{text}</p>
        </button>
    )
}
