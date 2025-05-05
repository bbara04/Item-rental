package hu.bme.rental.persistence.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "renting_transactions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RentingTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_type")
    private String transactionType;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "rented_item_id")
    private Item rentedItem;

    @ManyToOne
    @JoinColumn(name = "renter_user_id")
    private User renterUser;

    @Column(name = "start_date_time")
    private LocalDateTime startDateTime;

    @Column(name = "end_date_time")
    private LocalDateTime endDateTime;

    @Column(name = "remaining_days")
    private Integer remainingDays;

    @Column(name = "cost_per_day")
    private Float costPerDay;

    @Column(name = "cur_cost")
    private Float curCost;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

}