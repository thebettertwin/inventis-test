import clsx from "clsx";
import { Fire, Bolt } from "../../src/svgs";
import React from "react";
import { Pokemon } from "../types";

type AbilitiesChipProps = {
    abilities: Pick<Pokemon, 'ability'>[]
}

const AbilitiesChip: React.FC<AbilitiesChipProps> = ({ abilities }) => {
    {/* Future improvement: Would dynamically add icons and colour based on type of ability */ }
    return <>
        {
            abilities.map((element, index) => <li key={element.ability.name + '-key'} className={clsx([
                index % 2 === 0 ? "bg-blue-900" : "bg-orange-800",
                "flex gap-2 text-white justify-center capitalize rounded-2xl py-1 px-4 font-semibold"])}>{index % 2 === 0 ? <Fire /> : <Bolt />}{element.ability.name}</li>)
        }
    </>

}

export default AbilitiesChip;