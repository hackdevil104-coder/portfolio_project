package portfolio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import portfolio.entity.ContactMessage;

public interface ContactRepository extends JpaRepository<ContactMessage, Integer> {
}
