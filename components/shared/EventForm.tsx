"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from 'zod'
import { eventDefaultValues } from "@/constants"
import Dropdown from "./Dropdown"
import { Textarea } from "@/components/ui/textarea"
import { FileUploader } from "./FileUploader"
import { useState } from "react"
import Image from "next/image"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import { Calendar, Clock, MapPin, DollarSign, Link2, ImageIcon, Sparkles, Users, Tag, FileText } from "lucide-react"

type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  event?: IEvent,
  eventId?: string
}

const EventForm = ({ userId, type, event, eventId }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = event && type === 'Update' 
    ? { 
        ...event, 
        startDateTime: new Date(event.startDateTime), 
        endDateTime: new Date(event.endDateTime) 
      }
    : eventDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues
  })
 
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    const uploadedImageUrl = values.imageUrl;

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back()
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="w-6 h-6" />
              Event Details
            </h2>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-8">
              
              {/* Basic Information Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <Tag className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Basic Information</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Event Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter your event title" 
                            {...field} 
                            className="h-12 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Category</FormLabel>
                        <FormControl>
                          <div className="h-12 border-2 border-slate-300 rounded-lg focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all duration-200">
                            <Dropdown onChangeHandler={field.onChange} value={field.value} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Event Description</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your event in detail. What makes it special?" 
                          {...field} 
                          className="min-h-[120px] border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Event Image Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Event Image</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Upload Image</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg hover:border-blue-400 transition-colors duration-200">
                          <FileUploader 
                            onFieldChange={field.onChange}
                            imageUrl={field.value}
                            setFiles={setFiles}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Location</h3>
                </div>
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Event Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <Input 
                            placeholder="Enter venue address or 'Online Event'" 
                            {...field} 
                            className="h-12 pl-10 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Date & Time Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Date & Time</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="startDateTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Start Date & Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                            <DatePicker 
                              selected={field.value} 
                              onChange={(date: Date | null) => {
                                if (date) {
                                  field.onChange(date);
                                }
                              }} 
                              showTimeSelect
                              timeInputLabel="Time:"
                              dateFormat="MMM dd, yyyy h:mm aa"
                              className="w-full h-12 pl-10 pr-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                              placeholderText="Select start date and time"
                              minDate={new Date()}
                              popperClassName="!z-[9999]"
                              calendarClassName="!shadow-xl !border !border-slate-300 !rounded-lg"
                              wrapperClassName="w-full"
                              popperPlacement="bottom-start"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">End Date & Time</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                            <DatePicker 
                              selected={field.value} 
                              onChange={(date: Date | null) => {
                                if (date) {
                                  field.onChange(date);
                                }
                              }} 
                              showTimeSelect
                              timeInputLabel="Time:"
                              dateFormat="MMM dd, yyyy h:mm aa"
                              className="w-full h-12 pl-10 pr-3 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-200"
                              placeholderText="Select end date and time"
                              minDate={form.watch("startDateTime") || new Date()}
                              popperClassName="!z-[9999]"
                              calendarClassName="!shadow-xl !border !border-slate-300 !rounded-lg"
                              wrapperClassName="w-full"
                              popperPlacement="bottom-start"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pricing & Links Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-800">Pricing & Links</h3>
                </div>
                
                <div className="flex flex-col gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Ticket Price</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                              <Input 
                                type="number" 
                                placeholder="0.00" 
                                {...field} 
                                className="h-12 pl-10 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                                disabled={form.watch("isFree")}
                                step="0.01"
                                min="0"
                              />
                            </div>
                            
                            <FormField
                              control={form.control}
                              name="isFree"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                      <Checkbox
                                        onCheckedChange={field.onChange}
                                        checked={field.value}
                                        id="isFree" 
                                        className="h-5 w-5 border-2 border-blue-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600" 
                                      />
                                      <label 
                                        htmlFor="isFree" 
                                        className="text-slate-700 font-medium cursor-pointer"
                                      >
                                        free event
                                      </label>
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />   
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />   
                 
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Event Website</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                            <Input 
                              placeholder="https://your-event-website.com" 
                              {...field} 
                              className="h-12 pl-10 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" 
                              type="url"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Event...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>{type} Event</span>
                    </div>
                  )}
                </Button>
              </div>
              
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default EventForm