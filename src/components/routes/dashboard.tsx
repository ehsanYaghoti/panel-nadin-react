import { useEffect, useState } from "react";
import Header from "../layouts/general/header";
import Navbar from "../layouts/general/navbar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Dashboard = () => {

    const [time , setTime] = useState('00:00')
    const [goodDay, setGoodDay] = useState('Good day')
    const [username , setUsername] = useState('User')

    const { t , i18n } = useTranslation()

    useEffect(() => {

        // const storedLanguage = localStorage.getItem('language')

        // if(storedLanguage){
        //     i18n.changeLanguage(storedLanguage)
        // }

        const storedUsername = localStorage.getItem('username')

        if(storedUsername){
            setUsername(storedUsername)
        } else {
            toast.warn('to full access you have to login in profile')
        }


        const date = new Date().toLocaleTimeString('en-IR' , { hour: "2-digit", minute: "2-digit" , hour12 : false } )
        setTime(date)

        const hour = +date.slice(0 ,2)
        // const minute = +date.slice(3 ,5)

        if(hour < 12 && hour >= 6){
            setGoodDay(t('Good morning'))
        } 

        if(hour === 12){
            setGoodDay(t('Good noon'))
        } 

        if(hour > 12 && hour < 16 ){
            setGoodDay(t('Good after noon'))
        }

        if(hour >= 16 && hour <= 18) {
            setGoodDay(t('Good evening'))
        }

        if(hour > 18 || hour < 6){
            setGoodDay(t('Good night'))
        }

    } , [i18n , t])

    return (
        <div className="flex flex-col w-full h-screen" >
            <Header />
            <div className="flex w-full h-full" >
                <Navbar />
                <main className="flex items-center justify-center w-full" >
                    <section className="flex flex-col gap-10 w-fit  h-fit" dir={localStorage.getItem('i18nextLng') === 'fa' ? 'rtl' : ''} >
                        <span id="time" className="font-bold text-3xl " >{time}</span>
                        <span className="font-semibold text-2xl" >{` ${goodDay} , ${username} `}</span>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Dashboard;