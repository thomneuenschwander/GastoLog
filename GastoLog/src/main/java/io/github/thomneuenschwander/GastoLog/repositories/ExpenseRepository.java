package io.github.thomneuenschwander.GastoLog.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import io.github.thomneuenschwander.GastoLog.domain.entities.Expense;
import io.github.thomneuenschwander.GastoLog.domain.entities.User;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;

public interface ExpenseRepository extends JpaRepository<Expense, Long>, JpaSpecificationExecutor<Expense>{

    List<Expense> findAllByClient(User user);

    Optional<Expense> findByIdAndClient(Long id, User client);

    void deleteByIdAndClient(Long id, User client);

    default List<Expense> findByNameLikeAndPriceGreaterAndUserId(String name, Double price, Long userId){
        
        Specification<Expense> conjunction = (root, query, cb) -> cb.conjunction();
        Specification<Expense> spec = Specification.where(conjunction);

        if(StringUtils.hasText(name)){
            Specification<Expense> nameLike = (root, query, cb) -> cb.like(cb.upper(root.get("description")), "%"+name.toUpperCase()+"%");
            spec = spec.and(nameLike);
        }
        if(price != null){
            Specification<Expense> priceGreatherThen = (root, query, cb) -> cb.greaterThan(root.get("price"), price);
            spec = spec.and(priceGreatherThen);
        }

        if (userId != null) {
            Specification<Expense> userEquals = (root, query, cb) -> {
                Join<Expense, User> userJoin = root.join("client", JoinType.INNER);
                return cb.equal(userJoin.get("id"), userId);
            };
            spec = spec.and(userEquals);
        }

        return findAll(spec);
    }
}
