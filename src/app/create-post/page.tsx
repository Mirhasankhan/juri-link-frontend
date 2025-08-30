"use client";
import { useForm } from "react-hook-form";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded"
    >
      <h2 className="text-xl font-semibold mb-4">Request Details</h2>

      <div className="mb-4">
        <label className="label-design">Request Title *</label>
        <input
          type="text"
          placeholder="Brief title describing your legal need"
          {...register("title", { required: true })}
          className="input-design mt-1"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">Title is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="label-design">Legal Category *</label>
        <select
          {...register("category", { required: true })}
          className="input-design mt-1"
        >
          <option value="">Select a category</option>
          <option value="Family">Family Law</option>
          <option value="Criminal">Criminal Law</option>
          <option value="Immigration">Immigration</option>
          <option value="Business">Business</option>
          {/* Add more categories as needed */}
        </select>
        {errors.category && (
          <span className="text-red-500 text-sm">Category is required</span>
        )}
      </div>

      <div className="mb-4">
        <label className="label-design">Detailed Description *</label>
        <textarea
          rows={4}
          placeholder="Provide detailed information about your legal situation..."
          {...register("description", { required: true })}
          className="input-design mt-1"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm">Description is required</span>
        )}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="label-design">📍 Location</label>
          <input
            type="text"
            placeholder="City, State"
            {...register("location")}
            className="input-design mt-1"
          />
        </div>

        <div>
          <label className="label-design">$ Budget Range</label>
          <input
            type="number"
            placeholder="enter your budget"
            {...register("budget")}
            className="input-design mt-1"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="label-design">Service Type</label>
          <select {...register("type")} className="input-design mt-1">
            <option value="">Select Service Type</option>
            <option value="online">Online Consultation</option>
            <option value="inPerson">In-Persion</option>
            <option value="both">Online Or In-Persion</option>
          </select>
        </div>

        <div>
          <label className="label-design">Urgency Level</label>
          <select {...register("urgency")} className="input-design mt-1">
            <option value="low">Normal - Standard timeline</option>
            <option value="medium">Urgent</option>
            <option value="high">Immediate attention</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Post Legal Request
      </button>
    </form>
  );
};

export default CreatePost;
