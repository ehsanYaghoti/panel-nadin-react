import { useTranslation } from "react-i18next";
import { NavLink  } from "react-router-dom";

const Navbar = () => {

    const {t} = useTranslation()

    return (
        <nav className="w-64  h-full hidden md:flex items-start justify-center p-6 border-x-2 border-slate-700 " >
            <ul className=" flex flex-col items-center gap-2 text-lg " >
                <li>
                    <NavLink to={'/'} id="dashboard" className={({isActive}) => { return isActive ? 'font-semibold' : '' }}  >
                        {t('dashboard')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/todos'}  className={({isActive}) => { return isActive ? 'font-semibold' : '' }}   >
                        {t('todos')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/wheater'} className={({isActive}) => { return isActive ? 'font-semibold' : '' }}   >
                        {t('wheater')}
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/profile'} className={({isActive}) => { return isActive ? 'font-semibold' : '' }}   >
                        {t('profile')}
                    </NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default Navbar;