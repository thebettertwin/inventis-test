import React from 'react'
import { Switch } from '@headlessui/react'

type ToggleProps = {
    onChange: (enabled: boolean) => void;
    enabled: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ onChange, enabled }) => {
    return (
        <Switch
            checked={enabled}
            onChange={onChange}
            className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[28px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
            <span className="sr-only">Enable Yoda language translations</span>
            <span
                aria-hidden="true"
                className={`${enabled ? 'translate-x-7' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
        </Switch>
    )
}

export default Toggle;