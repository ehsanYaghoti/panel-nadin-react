import { useEffect , useState } from "react";
import TextField from '@mui/material/TextField';
import { Autocomplete, Box } from "@mui/material";
import { useQueryClient , useQuery , useMutation } from '@tanstack/react-query';

// import layouts
import Header from "../layouts/general/header";
import Navbar from "../layouts/general/navbar";

// import constants
import locationsJson from './../../constants/ir.json'

// import types
import { LocationOptionType  } from "../../types/weather";
import getWeatherInfo from "../../helpers/weather";



const Wheater = () => {

    const [locations , setLocations] = useState<LocationOptionType[]>([])
    const [city , setCity] = useState<LocationOptionType | null >({
        id : 0,
        label : 'tehran',
        lat : '35.7000',
        lng : '51.4167'
    })
    // const [wheaterInfo , setWheaterInfo] = useState<CityWheaterInfoType | null>({
    //     temperature : 0,
    //     temperature_unit : 'C',
    //     lat : '35.7000',
    //     lng : '51.4167',
    //     time : '',
    //     is_day : 0,
    //     descriptions : '',
    //     image : ''
    // })

    useEffect(() => {

        const locationsArray = locationsJson.map((location , index) => {
            return  {
                label : location.city,
                id : index,
                lat : location.lat,
                lng : location.lng
            }
        })
        setLocations(locationsArray)
        

    } , [])

    const queryClient = useQueryClient()
    
    const { data  , error , isLoading } = useQuery({queryKey :  ['weatherData'] , queryFn : () =>  getWeatherInfo(city) })
    
    

    let wheaterInfo = data
    // console.log(data) 

    const mutation = useMutation({
        mutationFn: getWeatherInfo,
        onSuccess: (value) => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['weatherData'] })
        },
    })

    // console.log(mutation.data)
    if(mutation.data){
        wheaterInfo = mutation.data
    }

    if (error) { console.log(error) }

    return (
        <div className="flex flex-col w-full h-screen overflow-auto" >
            <Header />
            <div className="flex w-full h-full" >
                <Navbar />
                <main className="flex items-center justify-center w-full " >
                    <section className="flex flex-col items-center gap-8 w-[300px] md:w-[500px] ">
                        <Autocomplete
                            disablePortal
                            options={locations}
                            sx={{width : '100%'}}
                            value={city}
                            onChange={(event , newValue) => { 
                            
                                // console.log(newValue)
                                if(newValue)
                                mutation.mutate(newValue)
                                setCity(newValue)
                             
                            }}

                            renderInput={(params) => <TextField {...params} label="location" />}
                            renderOption={(props , option) => {
                                const { key , ...optionProps} = props
                                return (
                                    <Box 
                                        key={option.id}
                                        component="li"
                                        {...optionProps}
                                    >
                                        {option?.label}
                                    </Box>
                                )
                            }}
                        />
                        
                        <div className="w-full h-fit min-h-fit p-6 rounded-md border border-slate-700 flex flex-col gap-2 items-start justify-evenly text-lg font-semibold  " >
                            { isLoading ?  
                                
                                <i className="w-8 h-8  self-center" >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin ">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                    </svg>
                                </i>
                              
                            : 
                            <>
                                <span className="w-fit" >{city?.label}</span>
                                <span className="w-fit" >{wheaterInfo?.temperature} {wheaterInfo?.temperature_unit}</span>
                                <span className="w-full flex items-center justify-between gap-2" >
                                    {wheaterInfo?.descriptions}
                                    <img  className="border w-20 h-20 bg-slate-300 rounded" src={`${wheaterInfo?.image}`} alt="" />
                                </span>
                                <span className="w-fit" >{wheaterInfo?.is_day === 0 ? 'night' : 'day'}</span>
                                <p className="w-full flex justify-between " >
                                    <span>updated at </span> 
                                    <span>{wheaterInfo?.time.replace('T' , '  ').replaceAll('-'  , '/')}</span>
                                </p>
                            </>
                            }
                        </div>
                    </section>
                </main>
            </div>
        </div>    
    )
}

export default Wheater;