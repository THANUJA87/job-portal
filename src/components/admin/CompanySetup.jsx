import React, { useEffect, useState } from 'react';
import PageLayout from '../layout/PageLayout';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompanyByIdAPI, upadteCompanyAPI } from '@/services/allApi';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import StatusBanner from '../ui/StatusBanner';

const CompanySetup = () => {
    const { singleCompany } = useSelector((store) => store.company);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: 'success' });
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        logo: null
    });

    // Fetch company details on component mount
    useEffect(() => {
        getSingleCompany();
    }, [id, dispatch]);

    const getSingleCompany = async () => {
        const token = sessionStorage.getItem("token");
        if (token) {
            const reqHeader = { "Authorization": `Bearer ${token}` };
            try {
                const result = await getCompanyByIdAPI(id, reqHeader);
                console.log("Fetched Company:", result.data.company);

                if (result.status === 200) {
                    dispatch(setSingleCompany(result.data.company));
                }
            } catch (error) {
                console.error("Error fetching company:", error);
            }
        }
    };

    // Update form fields when `singleCompany` is available
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.companyName || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                logo: singleCompany.logo || null
            });
        }
    }, [singleCompany]);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, logo: file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const reqBody = new FormData();
        reqBody.append("companyName", input.name);
        reqBody.append("description", input.description);
        reqBody.append("website", input.website);
        reqBody.append("location", input.location);
        if (input.logo) reqBody.append("logo", input.logo);

        const token = sessionStorage.getItem('token');
        if (token) {
            try {
                setLoading(true);
                const reqHeaders = { "Authorization": `Bearer ${token}` };
                const res = await upadteCompanyAPI(reqBody, reqHeaders, id);
                if (res.status === 200) {
                    setFeedback({ message: 'Company updated successfully', type: 'success' });
                    setTimeout(() => navigate('/admin/companies'), 800);
                } else {
                    setFeedback({ message: 'Update failed. Please try again.', type: 'error' });
                }
            } catch (error) {
                console.error("Update error:", error);
                setFeedback({ message: 'Something went wrong. Please try again.', type: 'error' });
            } finally {
                setLoading(false);
            }
        } else {
            setFeedback({ message: 'Not authorized. Please log in again.', type: 'error' });
        }
    };

    return (
        <PageLayout>
            <div className='page-container max-w-xl py-10'>
                <StatusBanner
                    message={feedback.message}
                    type={feedback.type}
                    onClose={() => setFeedback({ message: '', type: 'success' })}
                />
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate("/admin/companies")} variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>
                    {loading ? (
                        <Button className="w-full my-4">
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Update</Button>
                    )}
                </form>
            </div>
        </PageLayout>
    );
};

export default CompanySetup;
