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
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-md-10 offset-md-1">
                            <div class="card shadow-lg">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-4 text-center">
                                            <a href="wallet.php" class="clickable-item">
                                                <img src="/admin/images/transaction.png" alt="Transaction Image" class="img-fluid custom-img">
                                                <h5 class="card-title text-center">TRANSACTION</h5>     
                                            </a>
                                        </div>
                                        <div class="col-md-4 border-start text-center">
                                            <a href="wallet_user.php" class="clickable-item">
                                                <img src="/admin/images/group-of-users.png" alt="Image" class="img-fluid custom-img">
                                                <h5 class="card-title text-center">USER</h5>
                                            </a>
                                        </div>
                                        <div class="col-md-4 border-start text-center">
                                            <a href="wallet_deposit.php" class="clickable-item">
                                                <img src="/admin/images/deposit.png" alt="Deposit Image" class="img-fluid custom-img">
                                                <h5 class="card-title text-center">DEPOSIT</h5>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="row justify-content-center">
                                    <div class="col-md-5">
                                        <a href="pending.php" class="card-link">
                                            <div class="card custom-card">
                                                <div class="card-body">
                                                    <h1 class="card-title text-center" style="margin: 80px;">PENDING</h1>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="col-md-5" style="margin-left: 45px;"> 
                                        <a href="history.php" class="card-link">
                                            <div class="card custom-card">
                                                <div class="card-body">
                                                    <h1 class="card-titles text-center" style="margin: 80px;">HISTORY</h1>
                                                </div>
                                            </div>
                                        </a>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>             
        </main>   
    </div>
</body>
</html>