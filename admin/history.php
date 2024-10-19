<!DOCTYPE html>
<html lang="en">

<?php
    $title = 'Wallet';
    $wallet_page = 'active';
    require_once('./include/head.php');
?>

<body>

    <!-- Page Content -->
    <div class="container-fluid">
        <div class="row">
            <!-- Sidebar -->
            <?php
            require_once('./include/sidebar.php');
            ?>

            <!-- Main Content -->
           <main class="col-md-9 ms-sm-auto col-lg-10 px-md-6">
            <div class="col-md-9 ms-sm-auto col-lg-12 px-md-4">
                <div class="row justify-content-center"> <!-- Center the circle-container -->
                    <div class="circle-container">
                        <div class="circle-content">
                            <img src="/admin/images/group-of-users.png" alt="Image">
                            <h5>USER</h5>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="container mt-3">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <h1 class="card-title text-left" style="margin-left: 20px; margin-top: 15px;">History</h1>
                            <div class="card-body">
                                <div class="table-box">
                                    <div class="table-row-header">
                                        <div class="table-cell">
                                            <h5>Name</h5>
                                        </div>
                                        <div class="table-cell">
                                            <h5>Proof of Payment</h5>
                                        </div>
                                        <div class="table-cell">
                                            <h5>Amount Deposited</h5>
                                        </div>
                                    </div>
                                    <div class="table-row">
                                        <div class="table-cell">
                                            <p>Mohammad Jauhari Sali S.</p>
                                        </div>
                                        <div class="table-cell">
                                            <p><a href="see_attachment.html">See Attachment</a></p>
                                        </div>
                                        <div class="table-cell">
                                            <p>100.00</p>
                                        </div>
                                    </div>
                                    <!-- Add more table rows as needed -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-12 col-lg-6 offset-lg-6 d-flex justify-content-end align-items-center">
                            <a href="wallet_user.php" class="btn btn-primary" id="return-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Return</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div> 
            
</body>
</html>