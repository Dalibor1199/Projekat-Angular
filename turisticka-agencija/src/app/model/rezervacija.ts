import { Destinacija } from "./destinacija";
import { Korisnik } from "./korisnik";
import { Smestaj } from "./smestaj";
import { Transport } from "./transport";

export class Rezervacija {

    public smestaj: Smestaj;
    public transport: Transport;
    public destinacija: Destinacija;
    public korisnik: Korisnik;
}