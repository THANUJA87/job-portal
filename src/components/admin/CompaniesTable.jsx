import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { deletecompanyAPI, getCompanyAPI } from '@/services/allApi';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllCompanies } from '@/redux/companySlice'
import { useEffect } from 'react';
import ServerURL from '@/services/serverurl';

const CompaniesTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { companies, searchCompanyByText } = useSelector(store => store.company)

    useEffect(() => {
        getCompany()
    }, []);

    const getCompany = async () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            try {
                const result = await getCompanyAPI(reqHeader)
                console.log(result);
                if (result.status == 200) {
                    setAllCompanies(result.data.company)
                    dispatch(setAllCompanies(result.data.company))
                }
            } catch (error) {
                console.log(error);

            }
        }
    }

    const [filterCompany, setFilterCompany] = useState(companies)
    useEffect(() => {
        const filteredCompany = companies.length > 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            }
            return company?.companyName?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
        setFilterCompany(filteredCompany)

    }, [companies, searchCompanyByText])

    const removecompany = async(id)=>{
        console.log("called");
        
       const token = sessionStorage.getItem('token')
       if(token){
        const reqHeader ={
            "Authorization":`Bearer ${token}`   
           }
        try {
            const result = await deletecompanyAPI(id,reqHeader)
            if(result.status == 200 ){
                alert("Company deleted successfully !!")
                setFilterCompany(prevcompany => prevcompany.filter(company => company._id !== id));

            }
        } catch (error) {
            console.log(error);
            
        }
       }
        
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany?.length > 0 ?
                            filterCompany?.map(company => (
                                <tr key={company?.id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={`${ServerURL}/uploads/${company?.logo}`} />
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{company.companyName}</TableCell>
                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                    <TableCell className="text-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <Edit2 className='w-4' />
                                                    <span>Edit</span>
                                                </div>
                                                <div onClick={() => removecompany(company?._id)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                    <i class="fa-solid fa-trash"></i>
                                                    <span>Delete</span>
                                                </div>

                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))
                            :
                            <div className='text-red-600 font-bold '> Not found !!</div>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable