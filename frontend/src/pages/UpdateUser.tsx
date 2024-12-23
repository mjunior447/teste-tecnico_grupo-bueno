import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserContext } from "@/contexts/UserContext";
import { User } from "@/entities/user.entity";
import { useToast } from "@/hooks/use-toast";
import useFetcher from "@/hooks/useFetcher";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";

interface IFormInput {
  name: string;
  email: string;
}

const UpdateUser = () => {
  const [userToUpdate, setUserToUpdate] = useState({} as User);
  const { updateUser } = useFetcher();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const { users } = useContext(UserContext);

  useEffect(() => {
    const selectedUser = users.find((user) => user.id === Number(id));
    setUserToUpdate(selectedUser as User);
  }, [id, users]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    values: userToUpdate,
  });

  const name = watch("name");
  const email = watch("email");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await updateUser(id!, data.name, data.email);

      toast({
        title: "Sucesso!",
        description: "O usuário foi alterado",
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
        description: "Um erro ocorreu na edição do usuário",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="page-container">
      <article className="flex flex-col gap-14 w-96">
        <h1 className="text-2xl font-bold text-gray-700">
          Alterar dados do usuário
        </h1>
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
                  {...register("name", { required: true })}
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
