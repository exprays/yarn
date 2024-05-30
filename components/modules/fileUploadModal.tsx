"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";      
import qs from "query-string";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { FileUpload } from "../fileUpload";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModalStore";

// schema
const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Attachment is required."
    })
})

export const FileUploadModal = () => {

    const router = useRouter();
    const { isOpen, onClose, type, data } = useModal();
    
    const isModalOpen = isOpen && type === "uploadFile";

    const { apiUrl, query } = data;
    

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    });

    const handleClose = () => {
        form.reset();
        onClose();
    }

    // disabled input while submitting information
    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query
            });

            await axios.post(url, {
                ...values,
                content: values.fileUrl
            })

            //refresh the viewport
            form.reset();
            router.refresh();
            handleClose();
            
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center font-bold text-black text-2xl">
                        Add an attatchment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file in chat
                    </DialogDescription>
                </DialogHeader>
                {/**Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-8 px-6">
                            <div className="flex items-center justify-center text-center">
                                <FormField control={form.control} name="fileUrl" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload endpoint="messageFile" onChange={field.onChange} value={field.value} />
                                        </FormControl>
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <DialogFooter className="bg-gray-100 px-6 py-4">
                            <Button variant="harmony">
                                Send
                            </Button> 
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
     );
};