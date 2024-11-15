import { useTranslation } from "react-i18next";
import Theme from "./theme";
import { NavLink } from "react-router-dom";

const Header = () => {

    const {t} = useTranslation()

    let openHiddenMenuHandler = () => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        overlay = document.getElementById("overlay");

        hiddenMenu?.classList.replace('hidden' , 'flex')
        overlay?.classList.replace('hidden' , 'flex')
    }

    let closeHiddenMenuHandler = () => {
        const hiddenMenu = document.getElementById("hiddenMenu"),
        
        overlay = document.getElementById("overlay");

        hiddenMenu?.classList.replace('flex' , 'hidden')
        overlay?.classList.replace('flex' , 'hidden')
    }

    return (
        <>
            <header className="w-full p-4 flex flex-col md:flex-row items-center justify-between px-6 border-b-2 border-slate-700   " >
                <span className="text-xl font-semibold hidden md:flex" >{t('header')}</span>
                <div className="flex md:hidden items-center justify-between w-full" >
                    {/* burger menu */}
                    <button id='openButten' onClick={openHiddenMenuHandler}  className='h-fit flex md:hidden' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <span className="text-xl font-semibold" >{t('header')}</span>
                </div>
                <div className="flex items-center gap-4 text-lg" >
                    {
                        localStorage.getItem('username') && <span className=" hidden md:flex items-center gap-2" >
                            {localStorage.getItem('username')}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </span>
                    }
                    {
                        localStorage.getItem('i18nextLng') && 
                        <span className="hidden md:flex" >
                            {
                                localStorage.getItem('i18nextLng') === 'fa' ? 'fa' : 'en'
                            }
                        </span>
                    }
                    <div  className="hidden md:flex " >
                        <Theme />                        
                    </div>
                </div>
            </header>

            {/* hidden menu */}
            <div id='hiddenMenu' dir='ltr' className='hidden flex-col items-start justify-start  gap-6 h-screen w-[320px] bg-slate-900   bg-opacity-100 fixed left-0 top-0 z-50 px-6 py-4 ' >
                <button id='closeButton' onClick={closeHiddenMenuHandler}  className='w-fit h-fit ' >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
                <Theme />  
                <nav className="w-fit  h-full flex items-start justify-center self-center p-6 text-blue-800 " >
                    <ul className=" flex flex-col items-center gap-4 text-xl font-base" >
                        <li>
                            <NavLink to={'/'} className={({isActive}) => { return isActive ? 'font-bold text-green-700' : '' }}  >
                                {t('dashboard')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/todos'}  className={({isActive}) => { return isActive ? 'font-bold text-green-700' : '' }}   >
                                {t('todos')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/wheater'} className={({isActive}) => { return isActive ? 'font-bold text-green-700' : '' }}   >
                                {t('wheater')}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/profile'} className={({isActive}) => { return isActive ? 'font-semibold text-green-700' : '' }}   >
                                {t('profile')}
                            </NavLink>
                        </li>

                    </ul>
                </nav>                      

            </div>

        </>
    )
}

export default Header;