"use client";
import { TableForm } from "@/components/TableForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Network,
  PersonStanding,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tolls = [
  {
    label: "Cadastrar Discípulo",
    href: "/members",
    icon: UserPlus,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Célula",
    href: "/cells",
    icon: Users,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Rede",
    href: "/networks",
    icon: Network,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
  {
    label: "Cadastrar Usuário",
    href: "/users",
    icon: User,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
];

const forms = [
  {
    label: "Nova Célula",
    icon: PersonStanding,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
];

const CellPage = () => {
  const router = useRouter();
  return (
    <div className=" items-center">
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Dashboard - Células
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Visão geral de sua gestão de células
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tolls.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
      <div>
        <TableForm />
      </div>
      <div>
        {forms.map((form) => (
          <Card
            key={form.label}
            className="p-4 border-black/5 hover:shadow-md transition w-[320px] md:w-[480px] mx-4 my-4"
          >
            <CardHeader>
              <CardTitle>{form.label}</CardTitle>
              <CardDescription>
                Escolha o nome, a rede, os membros e o líder da célula.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Nome da célula" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Rede</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Selecione a rede" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">IDE</SelectItem>
                        <SelectItem value="sveltekit">IDE Jovens</SelectItem>
                        <SelectItem value="next">Rede da Família</SelectItem>
                        <SelectItem value="next">Shara</SelectItem>
                        <SelectItem value="astro">Sou de Jesus </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Membros</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Selecione os membros" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">
                          Ana Carla Rodrigues da Silva
                        </SelectItem>
                        <SelectItem value="sveltekit">Membro2</SelectItem>
                        <SelectItem value="next">Membro3</SelectItem>
                        <SelectItem value="next">Membro4</SelectItem>
                        <SelectItem value="astro">Membro5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Líder</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Selecione o líder" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Membro1</SelectItem>
                        <SelectItem value="sveltekit">Membro2</SelectItem>
                        <SelectItem value="next">Membro3</SelectItem>
                        <SelectItem value="next">Membro4</SelectItem>
                        <SelectItem value="astro">Membro5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancelar</Button>
              <Button>Salvar</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CellPage;
