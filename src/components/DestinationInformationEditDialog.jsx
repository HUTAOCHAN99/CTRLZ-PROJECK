import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogFooter, DialogClose, DialogTitle, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cities } from "@/util";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAddDestination } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z.object({
    name: z.string().min(5, { message: "Minimal 5 karakter" }).max(50, { message: "Maksimal 50 karakter" }),
    kabupaten: z.enum(cities),
    description: z.string().min(5, { message: "Minimal 5 karakter" }).max(500, { message: "Maksimal 500 karakter" })
});

export function DestinationInformationEditDialog({ title, onSubmit, children, isLoading, submitText, values }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: values
    });
    const [open, setOpen] = useState(false);

    function handleSubmit(value) {
        onSubmit(value).then((success) => {
            console.log(!success);
            setOpen(!success);
        });
    }

    return <Dialog open={open} onOpenChange={setOpen}>
        {children}
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <FormField control={form.control}
                        name="name"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Nama</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        } />
                    <FormField
                        control={form.control}
                        name="kabupaten"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kabupaten</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {cities.map((value, index) => <SelectItem key={index} value={value}>{value}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control}
                        name="description"
                        render={({ field }) =>
                            <FormItem>
                                <FormLabel>Deskripsi</FormLabel>
                                <FormControl>
                                    <Textarea className="resize-none" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        } />

                    <DialogFooter >
                        <DialogClose asChild>
                            <Button disabled={isLoading} variant="destructive">
                                Batal
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isLoading}>
                            {submitText}
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}