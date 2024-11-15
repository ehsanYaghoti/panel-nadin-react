import { useTranslation } from "react-i18next";
import Header from "../layouts/general/header";
import Navbar from "../layouts/general/navbar";
import { useForm , SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

enum ThemeEnum {
    system = 'system',
    light = 'light',
    dark = 'dark'
}

enum LanguageEnum {
    en = 'en',
    fa = 'fa',
}

interface Inputs {
    username : string
    language : LanguageEnum
    theme : ThemeEnum
}

const Profile = () => {

    const { t , i18n } = useTranslation()
    const [storedUsername , setStoredUsername] = useState('')
    // const [storedTheme , setStoredTheme] = useState('')
    // const [storedLanguage , setStoredLanguage] = useState('')


    useEffect(() => {

        // const storedLanguage = localStorage.getItem('language')

        // if(storedLanguage){
        //     i18n.changeLanguage(storedLanguage)
        //     setStoredLanguage(storedLanguage)
        // }

        const storedUsername = localStorage.getItem('username')

        if(storedUsername){
            setStoredUsername(storedUsername)
        }

        // const storedTheme = localStorage.getItem('theme')

        // if(storedTheme){
        //     setStoredTheme(storedTheme)
        // }

    } , [i18n])

    const {
        register,
        handleSubmit,
        // watch,
        formState : {errors}
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => { 

        localStorage.setItem('username' , data.username)
        localStorage.setItem('theme' , data.theme)
        localStorage.setItem('language' , data.language)

        i18n.changeLanguage(data.language)
        
        toast.success('information changed successfully')

    }

    // console.log(watch("username")) // watch input value by passing the name of it


    return (
        <div className="flex flex-col w-full h-screen overflow-auto" >
            <Header />
            <div className="flex w-full h-full" >
                <Navbar />
                <main className="flex items-center justify-center w-full " >
                    <form className="flex flex-col items-center gap-4 w-[300px] md:w-[400px]" onSubmit={handleSubmit(onSubmit)} >
                        <label className={`w-full ${localStorage.getItem('i18nextLng') === 'fa' ? 'text-right' : 'text-left' } `} htmlFor="username">{t('username')} </label>
                        <input id="username" defaultValue={storedUsername} {...register('username' , {required : true , minLength : 3})} className="p-1 w-full text-blue-600 rounded-md border border-slate-700" type="tesxt" placeholder="enter username here..." />
                        {errors.username && <span className="text-red-500" >This username field is required atleast 3 character</span>}

                        <label className={`w-full ${localStorage.getItem('i18nextLng') === 'fa' ? 'text-right' : 'text-left' } `} htmlFor="language">{t('language')}</label>
                        <select className="p-1 w-full rounded-md border border-slate-700 text-blue-700"  {...register('language' , { required : true })} name="language" id="language">
                            <option value={`${localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : '' }`} >{localStorage.getItem('i18nextLng') ? localStorage.getItem('i18nextLng') : 'choose a language...' }</option>
                            <option value="en">en</option>
                            <option value="fa">fa</option>
                        </select>
                        {errors.language && <span className="text-red-500" >This language field is required</span>}

                        <button type="submit" id="saveButton" className="px-2 py-1 border w-fit rounded-md border-slate-600">Save</button>

                    </form>
                </main>
            </div>
        </div>   
    )
}

export default Profile;