package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Destinacija;

public interface DestinacijaRepository extends JpaRepository<Destinacija, Integer> {
	
	Destinacija findByNaziv(String naziv);

}
