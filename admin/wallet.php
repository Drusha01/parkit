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
                    <div class="row justify-content-center">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="row mb-2">
                                        <div class="d-flex align-items-center">
                                            <h4 class="card-title text-left">Transaction</h4>
                                            <div class="search-keyword d-flex ms-auto">
                                                <div class="input-group">
                                                    <input type="text" name="keyword" id="keyword" placeholder="Search..." class="form-control">
                                                    <button class="btn btn-outline-secondary brand-bg-color" type="button">
                                                        <i class="fa fa-search color-white" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                                <div id="MyButtons" class="d-flex flex-column flex-md-row mb-md-2 mb-lg-0">
                                                    <div class="form-group col-12 col-md-auto">
                                                        <label for="Date" class="visually-hidden">Date Filter</label>
                                                        <input type="date" id="Date" name="Date" class="form-control">
                                                    </div>
                                                </div>                                                                                       
                                            </div>
                                        </div>
                                    </div>
 
                                    <!-- Table -->
                                    <div class="table-responsive">
                                        <table class="table text-center">
                                            <colgroup>
                                                <col style="width: 10%;">
                                                <col style="width: 30%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                                <col style="width: 20%;">
                                            </colgroup>
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">RENTER</th>
                                                    <th scope="col">DATE</th>
                                                    <th scope="col">SPACE OWNER</th>
                                                    <th scope="col">PROOF OF PAYMENT</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <img src="/admin/images/user.png" alt="Profile Image" width="30" height="30">
                                                    </td>
                                                    <td>Mark Tan</td>
                                                    <td>01/04/23</td>
                                                    <td>Janice Chang</td>
                                                    <td>
                                                        <a href="payment" style="color: #06283D;">Proof of Payment</a>
                                                    </td>
                                                </tr>
                                                <!-- Add more table rows as needed -->
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container mt-4">
                    <div class="row">
                        <div class="col-12 col-lg-6 offset-lg-6 d-flex justify-content-end align-items-center">
                            <a href="wallet.php" class="btn btn-primary" id="return-btn"><i class="fa fa-arrow-left" aria-hidden="true"></i> Return</a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</body>
</html>