import axios from "axios";
import { DescriptionsType , LocationOptionType  } from "../types/weather";
import descriptions from '../constants/descriptions.json'


const getWeatherInfo = async (city : LocationOptionType | null) => {
    try {
        
        const res = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${city?.lat}&longitude=${city?.lng}&current_weather=true&current=temperature_2m&rain,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall&timezone=auto`)
        
        const weathercode  = res.data.current_weather.weathercode as string
        const nightOrDay =  res.data.current_weather.is_day === 0 ? 'night' : 'day'

        const info = descriptions[weathercode as keyof DescriptionsType][nightOrDay].description
        const image = descriptions[weathercode as keyof DescriptionsType][nightOrDay].image


        return {
            temperature : res.data.current_weather.temperature,
            temperature_unit : res.data.current_weather_units.temperature,
            lat : res.data.latitude,
            lng : res.data.longitude,
            time : res.data.current_weather.time,
            is_day : res.data.current_weather.is_day,
            descriptions : info,
            image
        }
        // setWheaterInfo({
        //     temperature : res.data.current_weather.temperature,
        //     temperature_unit : res.data.current_weather_units.temperature,
        //     lat : res.data.latitude,
        //     lng : res.data.longitude,
        //     time : res.data.current_weather.time,
        //     is_day : res.data.current_weather.is_day,
        //     descriptions : info,
        //     image
        // })

    } catch (error) {
        console.log(error)
    }
}


export default getWeatherInfo;