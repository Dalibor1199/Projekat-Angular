package model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the smestaj database table.
 * 
 */
@Entity
@NamedQuery(name="Smestaj.findAll", query="SELECT s FROM Smestaj s")
public class Smestaj implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int idSmestaj;

	private String opisSmestaja;

	//bi-directional many-to-one association to Rezervacija
	@JsonIgnore
	@OneToMany(mappedBy="smestaj")
	private List<Rezervacija> rezervacijas;

	public Smestaj() {
	}

	public int getIdSmestaj() {
		return this.idSmestaj;
	}

	public void setIdSmestaj(int idSmestaj) {
		this.idSmestaj = idSmestaj;
	}

	public String getOpisSmestaja() {
		return this.opisSmestaja;
	}

	public void setOpisSmestaja(String opisSmestaja) {
		this.opisSmestaja = opisSmestaja;
	}

	public List<Rezervacija> getRezervacijas() {
		return this.rezervacijas;
	}

	public void setRezervacijas(List<Rezervacija> rezervacijas) {
		this.rezervacijas = rezervacijas;
	}

	public Rezervacija addRezervacija(Rezervacija rezervacija) {
		getRezervacijas().add(rezervacija);
		rezervacija.setSmestaj(this);

		return rezervacija;
	}

	public Rezervacija removeRezervacija(Rezervacija rezervacija) {
		getRezervacijas().remove(rezervacija);
		rezervacija.setSmestaj(null);

		return rezervacija;
	}

}