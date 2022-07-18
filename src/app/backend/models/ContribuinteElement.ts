export interface ContribuinteElement {
  id: number;
  position: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: number;
  celular: number;
  enderecos: [
    { rua: string },
    { numero: number },
    { bairro: string },
    { cidade: string },
    { cep: number },
    { estado: string },
    { pais: string },
  ]
}