import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import VaccinationList from "../../components/VaccinationList";
import { listAllVaccinations, getVaccinations } from '../../store/ducks/vaccination'

export const Dashboard = ({list, listAllVaccinations}: any) => {
    
    useEffect(() => {
        listAllVaccinations();
    }, [])
    
    return (
        <div>
            

            <div>
                <VaccinationList list={list}/>
            </div>
        </div>
    )
}


export default connect(getVaccinations, (dispatch: any) => ({
	listAllVaccinations: () => dispatch(listAllVaccinations())
}))(Dashboard)
