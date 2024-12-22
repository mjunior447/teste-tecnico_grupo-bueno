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

const UpdateUser = () => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { updateUser } = useFetcher();
  const { toast } = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const usuario = await updateUser();
      console.log("usuario: ", usuario);

      toast({
        title: "Sucesso!",
        description: "O usuário foi alterado",
      });

      navigate('/')
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Um erro ocorreu na edição do usuário",
      });
    }
  };

  return (
    <main className="page-container">
      <article className="flex flex-col gap-14 w-96">
        <h1 className="text-2xl font-bold">Alterar dados do usuário</h1>
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
            Aplicar alterações
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

export default UpdateUser;
