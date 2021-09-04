package controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import classes.Response;
import model.Destinacija;
import model.Korisnik;
import model.Rezervacija;
import model.Smestaj;
import model.Transport;
import model.Uloga;
import repository.DestinacijaRepository;
import repository.KorisnikRepository;
import repository.RezervacijaRepository;
import repository.SmestajRepository;
import repository.TransportRepository;
import repository.UlogaRepository;

@RestController

@RequestMapping("/api/")
public class Kontroler {

	@Autowired
	DestinacijaRepository dr;
	@Autowired
	KorisnikRepository kr;
	@Autowired
	UlogaRepository ur;
	@Autowired
	TransportRepository tr;
	@Autowired
	SmestajRepository sr;
	@Autowired
	RezervacijaRepository rr;

	@GetMapping(value = "sveDestinacije")
	public ResponseEntity<List<Destinacija>> sveDestinacije() {
		System.out.println("Sve destinacije");
		return new ResponseEntity<List<Destinacija>>(dr.findAll(), HttpStatus.OK);
	}

	@PostMapping(value = "register")
	public ResponseEntity<Boolean> saveKorisnik(@RequestBody Korisnik korisnik) {
		if (korisnik.getUsername() != null && kr.findByUsername(korisnik.getUsername()) != null) {
			System.out.println("dksajnsda");
			return new ResponseEntity<Boolean>(false, HttpStatus.OK);
		}
		Korisnik k = new Korisnik();
		k.setBrMob(korisnik.getBrMob());
		k.setIme(korisnik.getIme());
		k.setPrezime(korisnik.getPrezime());
		k.setUsername(korisnik.getUsername());
		k.setPassword(korisnik.getPassword());
		Uloga u = ur.findByNaziv("Korisnik");
		k.setUloga(u);
		kr.save(k);
		System.out.println("2334");
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);

	}

	@PostMapping(value = "login")
	public ResponseEntity<Response> login(@RequestParam(name = "username") String username,
			@RequestParam(name = "password") String password) {
		System.out.println(username);
		Response r = new Response();

		if (kr.findByUsername(username) != null) {
			if (kr.findByUsername(username).getPassword().equals(password)) {
				r.setUsername(username);
				r.setIdUloga(kr.findByUsername(username).getUloga().getIdUloga());
				r.setIme(kr.findByUsername(username).getIme());
				r.setPrezime(kr.findByUsername(username).getPrezime());
			}
		}
		return new ResponseEntity<Response>(r, HttpStatus.OK);

	}

	@GetMapping(value = "getTransport")
	public ResponseEntity<List<Transport>> getTransport() {
		System.out.println("Lista transporta");
		return new ResponseEntity<List<Transport>>(tr.findAll(), HttpStatus.OK);
	}

	@GetMapping(value = "getSmestaj")
	public ResponseEntity<List<Smestaj>> getSmestaj() {
		System.out.println("Lista smestaja");
		return new ResponseEntity<List<Smestaj>>(sr.findAll(), HttpStatus.OK);
	}

	@PostMapping(value = "saveRezervacija")
	public ResponseEntity<Rezervacija> saveRezervacija(@RequestParam(name = "username") String username,
			@RequestParam(name = "transport") String transport, @RequestParam(name = "smestaj") String smestaj,
			@RequestParam(name = "dest") String dest, @RequestParam(name = "cena") String cenaString) {

		Rezervacija r = new Rezervacija();
		r.setDestinacija(dr.findByNaziv(dest));
		r.setKorisnik(kr.findByUsername(username));
		r.setSmestaj(sr.findByOpisSmestaja(smestaj));
		r.setTransport(tr.findByOpisTransporta(transport));
		double cenaDouble = Double.parseDouble(cenaString);
		r.setCena((int) cenaDouble);
		rr.save(r);
		return new ResponseEntity<Rezervacija>(r, HttpStatus.OK);

	}

	@GetMapping("filter")
	public ResponseEntity<List<Destinacija>> filter(@RequestParam(name = "naziv") String naziv,
			@RequestParam(name = "cena") String cenaString, @RequestParam(name = "date") String dateString)
			throws ParseException {

		List<Destinacija> lista = dr.findAll();
		List<Destinacija> glavnaLista = new ArrayList<Destinacija>();

		// sva 3 parametra uneta

		if (!naziv.equals("") && !cenaString.equals("") && !dateString.equals("")) {
			int cena = Integer.parseInt(cenaString);
			glavnaLista = lista.stream().filter(x -> x.getNaziv().contains(naziv) && x.getCena() <= cena
					&& x.getDatum().toString().equals(dateString)).collect(Collectors.toList());
		}

		// naziv i cena
		else if (!naziv.equals("") && !cenaString.equals("") && dateString.equals("")) {
			int cena = Integer.parseInt(cenaString);
			glavnaLista = lista.stream().filter(x -> x.getNaziv().contains(naziv) && x.getCena() <= cena)
					.collect(Collectors.toList());
		}

		// naziv i datum
		else if (!naziv.equals("") && cenaString.equals("") && !dateString.equals("")) {
			glavnaLista = lista.stream()
					.filter(x -> x.getNaziv().contains(naziv) && x.getDatum().toString().equals(dateString))
					.collect(Collectors.toList());
		}

		// cena i datum

		else if (naziv.equals("") && !cenaString.equals("") && !dateString.equals("")) {
			int cena = Integer.parseInt(cenaString);
			glavnaLista = lista.stream().filter(x -> x.getDatum().toString().equals(dateString) && x.getCena() <= cena)
					.collect(Collectors.toList());
		}

		// naziv

		else if (!naziv.equals("") && cenaString.equals("") && dateString.equals("")) {
			glavnaLista = lista.stream().filter(x -> x.getNaziv().contains(naziv)).collect(Collectors.toList());
		}

		// cena

		else if (naziv.equals("") && !cenaString.equals("") && dateString.equals("")) {
			int cena = Integer.parseInt(cenaString);
			glavnaLista = lista.stream().filter(x -> x.getCena() <= cena).collect(Collectors.toList());
		}

		// datum
		else if (naziv.equals("") && cenaString.equals("") && !dateString.equals("")) {
			glavnaLista = lista.stream().filter(x -> x.getDatum().toString().equals(dateString))
					.collect(Collectors.toList());
		}

		return new ResponseEntity<List<Destinacija>>(glavnaLista, HttpStatus.OK);
	}

	@PostMapping("addDest")
	public ResponseEntity<Destinacija> addDest(@RequestParam(name = "naziv") String naziv,
			@RequestParam(name = "cena") String cena, @RequestParam("datum") String datum,
			@RequestParam(name = "slika") String slika) throws ParseException {
		Destinacija dest = new Destinacija();
		int cenaInt = Integer.parseInt(cena);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date date = new Date();
		date = sdf.parse(datum);
		System.out.println(datum);
		System.out.println(date.toString());
		dest.setNaziv(naziv);
		dest.setSlika(slika);
		dest.setCena(cenaInt);
		dest.setDatum(date);
		dr.save(dest);

		return new ResponseEntity<Destinacija>(dest, HttpStatus.OK);
	}

	@PostMapping("deleteDest")
	public ResponseEntity<Boolean> deleteDest(@RequestParam(name = "naziv") String naziv) {
		Destinacija dest = dr.findByNaziv(naziv);
		List<Rezervacija> rez = rr.findByDestinacija(dest);
		if (!rez.isEmpty()) {
			for (Rezervacija r : rez) {
				rr.delete(r);
			}
		}
		dr.delete(dest);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@PostMapping("updateDest")
	public ResponseEntity<Boolean> updateDest(@RequestParam(name = "naziv") String naziv,
			@RequestParam(name = "cena") String cenaString, @RequestParam(name = "datum") String datumString,
			@RequestParam(name = "slika") String slika) throws ParseException {
		Destinacija d = dr.findByNaziv(naziv);

		// sva 3 parametra
		if (!cenaString.equals("") && !datumString.equals("") && !slika.equals("")) {
			System.out.print("dsa");
			d.setCena(Integer.parseInt(cenaString));
			d.setDatum(new SimpleDateFormat("dd-mm-yyyy").parse(datumString));
			d.setSlika(slika);
			dr.save(d);
		}

		// cena i datum
		else if (!cenaString.equals("") && !datumString.equals("") && slika.equals("")) {
			d.setCena(Integer.parseInt(cenaString));
			d.setDatum(new SimpleDateFormat("dd-mm-yyyy").parse(datumString));
			dr.save(d);
		}

		// cena i slika
		else if (!cenaString.equals("") && datumString.equals("") && !slika.equals("")) {
			d.setCena(Integer.parseInt(cenaString));
			d.setSlika(slika);
			dr.save(d);
		}

		// datum i slika
		else if (cenaString.equals("") && !datumString.equals("") && !slika.equals("")) {
			d.setDatum(new SimpleDateFormat("dd-mm-yyyy").parse(datumString));
			d.setSlika(slika);
			dr.save(d);
		}

		// cena
		else if (!cenaString.equals("") && datumString.equals("") && slika.equals("")) {
			d.setCena(Integer.parseInt(cenaString));
			dr.save(d);
		}

		// datum
		else if (cenaString.equals("") && !datumString.equals("") && slika.equals("")) {
			d.setDatum(new SimpleDateFormat("mm-dd-yyyy").parse(datumString));
			dr.save(d);
			System.out.println(new SimpleDateFormat("mm-dd-yyyy").parse(datumString));
		}

		// slika

		else if (cenaString.equals("") && datumString.equals("") && !slika.equals("")) {
			d.setSlika(slika);
			dr.save(d);
		}

		else {
			return new ResponseEntity<Boolean>(false, HttpStatus.OK);

		}

		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}

	@GetMapping("rezervacijeKorisnika")
	public ResponseEntity<List<Rezervacija>> rezervacijeKorisnika(@RequestBody String username) {
		Korisnik k = kr.findByUsername(username);
		for (Rezervacija r : rr.findByKorisnik(k)) {
			System.out.println(r.getIdRezervacija());
		}
		return new ResponseEntity<List<Rezervacija>>(rr.findByKorisnik(k), HttpStatus.OK);
	}

	@GetMapping("sviKorisnici")
	public ResponseEntity<List<Korisnik>> sviKorisnici() {
		List<Korisnik> lista = kr.findAll();
		return new ResponseEntity<List<Korisnik>>(
				lista.stream().filter(x -> x.getUloga().getNaziv().equals("Korisnik")).collect(Collectors.toList()),
				HttpStatus.OK);
	}

	@PostMapping("deleteKorisnik")
	public ResponseEntity<Boolean> deleteKorisnik(@RequestParam(name = "username") String username) {
		Korisnik k = kr.findByUsername(username);
		List<Rezervacija> lista = k.getRezervacijas();
		if (!lista.isEmpty()) {
			for (Rezervacija r : lista) {
				rr.delete(r);
			}
		}
		kr.delete(k);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
