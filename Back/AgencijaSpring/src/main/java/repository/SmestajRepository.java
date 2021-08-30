package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Smestaj;

public interface SmestajRepository extends JpaRepository<Smestaj, Integer> {
	
	Smestaj findByOpisSmestaja(String opis);

}
