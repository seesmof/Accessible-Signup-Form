import Form from "@/components/Form";

export default function Page() {
  return (
    <div className="bg-linear-to-br to-sky-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-md outline outline-slate-300 shadow p-5">
          <Form />
        </div>
      </div>
    </div>
  );
}
