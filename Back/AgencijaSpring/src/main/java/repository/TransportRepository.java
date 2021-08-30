package repository;

import org.springframework.data.jpa.repository.JpaRepository;

import model.Transport;

public interface TransportRepository extends JpaRepository<Transport, Integer> {
	
	Transport findByOpisTransporta(String opis);

}
