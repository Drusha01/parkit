<!DOCTYPE html>
<html lang="en">

<?php
    $title = 'Dashboard';
    $index_page = 'active';
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
                <div class="d-flex justify-content-center align-items-center pt-3 text-center">
                    <h1 class="h2 mx-auto">Overview</h1>
                </div>

                <!-- Overview Content Goes Here -->
                <div class="row justify-content-center">
                    <div class="col-md-3">
                        <a href="tus.html" class="card-link">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">
                                        <img src="/admin/images/user.png" alt="Image" class="img-fluid mr-2" width="30" height="30">
                                        Total Users
                                    </h5>
                                    <p class="card-text text-center" style="font-size: 25px">100</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="tps.html" class="card-link">
                            <div class="card">
                                 <div class="card-body">
                                    <h5 class="card-title text-center">
                                        <img src="/admin/images/space.png" alt="Image" class="img-fluid mr-2" width="30" height="30">
                                        Total Space
                                    </h5>
                                    <p class="card-text text-center" style="font-size: 25px">500</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div class="col-md-3">
                        <a href="tcs.html" class="card-link">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title text-center">
                                        <img src="/admin/images/commission.png" alt="Image" class="img-fluid mr-2" width="30" height="30">
                                        Total Commission
                                    </h5>
                                    <p class="card-text text-center" style="font-size: 25px">100</p>
                                </div>
                            </div>
                        </a>
                    </div>                    
                </div>

                <div class="container mt-4">
                    <div class="row justify-content-center">
                        <div class="col-md-7">
                            <div class="card">
                                <div class="card-header text-center">
                                    <h5 class="card-title">Parking Space Survey</h5>
                                </div>
                                <div class="card-body">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <canvas id="myPieChart" width="300" height="300"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="card">
                                <div class="card-body">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <!-- Left side: Price, Time, and Additional Info -->
                                        <div>
                                            <h5 class="card-title">Today's Profit</h5>
                                            <p class="card-text" style="font-size: 30px;">
                                                &#8369;2,510 
                                                <i class="fas fa-clock" style="font-size: 15px;"></i>
                                                <span style="font-size: 15px;">Updated:</span> 
                                                <span id="updatedTime">12:30 PM</span>
                                            </p>
                                            <p class="card-text"><span id="raisedAmount">Raised up to 89 rents</span></p>
                                        </div>
                                        
                            
                                        <!-- Right side: Image -->
                                        <div class="ml-5">
                                            <img src="/admin/images/profit.png" alt="Image" class="img-fluid" width="70" height="70">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
            
                            <div class="col-md-13 mt-4">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 class="card-title">Total Profit</h5>
                                                <p class="card-text" style="font-size: 30px;">
                                                    &#8369;12,054 
                                                    <i class="fas fa-clock" style="font-size: 15px;"></i>
                                                    <span style="font-size: 15px;">Updated:</span> 
                                                    <span id="updatedTime">12:30 PM</span>
                                                </p>
                                            </div>
                    
                                            <!-- Right side: Image -->
                                            <div class="ml-5">
                                                <img src="/admin/images/wallet.png" alt="Image" class="img-fluid" width="70" height="70">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Include Bootstrap JS and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Chart.js -->
    <script defer src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            // Get the context of the canvas element
            var ctx = document.getElementById("myPieChart").getContext("2d");
    
            // Data for the donut chart
            var data = {
                labels: ["Total Spaces", "Verified Spaces", "Unverified Spaces"],
                datasets: [{
                    data: [35, 35, 10],
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                    borderWidth: 1 // Add border width for the donut effect
                }]
            };
    
            // Configuration options
            var options = {
                responsive: true,
                maintainAspectRatio: false,
                cutoutPercentage: 50 // Adjust the cutoutPercentage for the donut effect (50 for a classic donut)
            };
    
            // Create the donut chart
            var myDonutChart = new Chart(ctx, {
                type: 'doughnut', // Specify the chart type as doughnut
                data: data,
                options: options
            });
        });
    </script>
    
    </body>
    </html>