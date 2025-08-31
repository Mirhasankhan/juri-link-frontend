"use client";
import { useCreatePostMutation, useServicesQuery } from "@/redux/features/services/services.api";
import { TPostInput } from "@/types/common";
import { useForm } from "react-hook-form";

const CreatePost = () => {
  const { data: legalServices } = useServicesQuery("");
  const [submitPost, {isLoading}] = useCreatePostMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPostInput>();

  const onSubmit =async (data: any) => {
    const response = await submitPost(data)
    console.log(response);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Request Details</h2>

      {/* Title */}
      <div className="mb-4">
        <label className="label-design">Request Title *</label>
        <input
          type="text"
          placeholder="Brief title describing your legal need"
          {...register("title", { required: "Title is required" })}
          className="input-design mt-1"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">{errors.title.message}</span>
        )}
      </div>

      {/* Service */}
      <div className="mb-4">
        <label className="label-design">Select Service *</label>
        <select
          {...register("serviceId", { required: "Service is required" })}
          className="input-design mt-1"
        >
          <option value="">Select a service</option>
          {legalServices?.data?.map((service: any) => (
            <option key={service._id} value={service._id}>
              {service.serviceName}
            </option>
          ))}
        </select>
        {errors.serviceId && (
          <span className="text-red-500 text-sm">
            {errors.serviceId.message}
          </span>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="label-design">Detailed Description *</label>
        <textarea
          rows={4}
          placeholder="Provide detailed information about your legal situation..."
          {...register("description", { required: "Description is required" })}
          className="input-design mt-1"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Location & Budget */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="label-design">📍 Location *</label>
          <input
            type="text"
            placeholder="City, State"
            {...register("location", { required: "Location is required" })}
            className="input-design mt-1"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>

        <div>
          <label className="label-design">$ Budget Range *</label>
          <input
            type="number"
            placeholder="Enter your budget"
            {...register("budget", { required: "Budget is required" })}
            className="input-design mt-1"
          />
          {errors.budget && (
            <span className="text-red-500 text-sm">
              {errors.budget.message}
            </span>
          )}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="label-design">Urgency Level *</label>
          <select
            {...register("urgencyLevel", {
              required: "Urgency level is required",
            })}
            className="input-design mt-1"
          >
            <option value="">Select urgency</option>
            <option value="Low">Normal - Standard timeline</option>
            <option value="Medium">Urgent</option>
            <option value="High">Immediate attention</option>
          </select>
          {errors.urgencyLevel && (
            <span className="text-red-500 text-sm">
              {errors.urgencyLevel.message}
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        {
          isLoading ? "Submitting....." : "Post Legal Request"
        }
      </button>
    </form>
  );
};

export default CreatePost;
