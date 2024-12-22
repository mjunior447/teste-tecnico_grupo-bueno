import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import useFetcher from "@/hooks/useFetcher";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface IFormInput {
  name: string;
  email: string;
}

const CreateUser = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { createUser } = useFetcher();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const usuario = await createUser(data.name, data.email);
      console.log("usuario: ", usuario);

      toast({
        title: "Sucesso!",
        description: "O usuário foi criado",
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Um erro ocorreu na criação do usuário",
      });
    }
  };

  return (
    <main className="page-container">
      <article className="flex flex-col gap-14 w-96">
        <h1 className="text-2xl font-bold">Criar usuário</h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">E-mail</Label>
            <Input
              type="text"
              placeholder="Zé Fulano"
              id="name"
              {...register("name")}
            />

            <Label htmlFor="email">E-mail</Label>
            <Input
              type="email"
              placeholder="exemplo@google.com"
              id="email"
              {...register("email")}
            />
          </div>

          <Button
            type="submit"
            className="w-full p-3 text-lg text-white bg-green-500 hover:bg-green-300 text-center rounded-md"
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
