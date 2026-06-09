import { NavLink } from 'react-router-dom'

export const CustomNavigationMenuContent = ({ items, category }) => {
    return (
        <div className="flex flex-col w-100">
            <p className='text-gray-500 font-bold text-md pb-2'>{category}</p>
            <ul>
                {items.map((item) => (
                    <NavLink key={item.href} to={item.href} className={"flex flex-col hover:bg-muted gap-1"}>
                        <p>{item.label}</p>
                    </NavLink>
                ))}
            </ul>
        </div>
    )
}
