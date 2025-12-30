package portfolio.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import portfolio.entity.ContactMessage;
import portfolio.repository.ContactRepository;

@Service
public class ContactService {

    @Autowired
    private ContactRepository repo;

    public ContactMessage saveMessage(ContactMessage msg) {
        return repo.save(msg);
    }
}
