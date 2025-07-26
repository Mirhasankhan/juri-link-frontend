
"use client"
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
        <label className="block font-medium">Request Title *</label>
        <input
          type="text"
          placeholder="Brief title describing your legal need"
          {...register("title", { required: true })}
          className="w-full border px-3 py-2 rounded mt-1"
        />
        {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Legal Category *</label>
        <select
          {...register("category", { required: true })}
          className="w-full border px-3 py-2 rounded mt-1"
        >
          <option value="">Select a category</option>
          <option value="Family">Family Law</option>
          <option value="Criminal">Criminal Law</option>
          <option value="Immigration">Immigration</option>
          <option value="Business">Business</option>
          {/* Add more categories as needed */}
        </select>
        {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Detailed Description *</label>
        <textarea
          rows={4}
          placeholder="Provide detailed information about your legal situation..."
          {...register("description", { required: true })}
          className="w-full border px-3 py-2 rounded mt-1"
        ></textarea>
        {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">📍 Location</label>
          <input
            type="text"
            placeholder="City, State"
            {...register("location")}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">$ Budget Range</label>
          <select
            {...register("budget")}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="">Select budget range</option>
            <option value="under-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-plus">$1000+</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium">🕒 Timeline</label>
          <input
            type="date"
            {...register("timeline")}
            className="w-full border px-3 py-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Urgency Level</label>
          <select
            {...register("urgency")}
            className="w-full border px-3 py-2 rounded mt-1"
          >
            <option value="Normal">Normal - Standard timeline</option>
            <option value="Urgent">Urgent</option>
            <option value="Immediate">Immediate attention</option>
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
