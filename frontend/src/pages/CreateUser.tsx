import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useFetcher from "@/hooks/useFetcher";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface IFormInput {
  name: string;
  email: string;
}

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    control,
    setError,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const { createUser } = useFetcher();
  const { toast } = useToast();
  const navigate = useNavigate();

  const name = watch("name");
  const email = watch("email");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createUser(data.name, data.email);

      toast({
        title: "Sucesso!",
        description: "O usuário foi criado",
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      if (error.status === 422) {
        setError("email", {
          type: "custom",
          message: "Já existe um usuário com esse e-mail",
        });
      }

      toast({
        title: "Error",
        description: "Um erro ocorreu na criação do usuário",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="page-container">
      <article className="flex flex-col gap-14 w-96">
        <h1 className="text-2xl font-bold text-gray-700">Criar usuário</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Nome</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  placeholder="Zé Fulano"
                  id="name"
                  {...register("name")}
                  {...field}
                />
              )}
            />

            <Label htmlFor="email">E-mail</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  type="email"
                  placeholder="exemplo@google.com"
                  id="name"
                  {...register("email")}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p role="alert" className="text-sm text-red-500 font-bold">
                {errors.email?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full p-3 text-lg text-white bg-green-500 hover:bg-green-300 text-center rounded-md"
            disabled={!name || !email}
          >
            Criar
          </Button>
        </form>

        <Link
          to="/"
          className="w-full p-2 text-lg text-black bg-transparent text-center border border-gray-300 rounded-md hover:opacity-50"
        >
          Voltar
        </Link>
      </article>
    </main>
  );
};

export default CreateUser;
