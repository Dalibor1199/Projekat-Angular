package repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Destinacija;
import model.Korisnik;
import model.Rezervacija;

public interface RezervacijaRepository extends JpaRepository<Rezervacija, Integer> {
	
	List<Rezervacija> findByDestinacija(Destinacija dest);
	List<Rezervacija> findByKorisnik(Korisnik k);


}
