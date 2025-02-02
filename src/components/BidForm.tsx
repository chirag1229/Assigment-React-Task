import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
// import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

// Define types for the form fields' state
interface BidData {
  id: number;
  bidNo: string;
  createPerson: string;
  assignedStaff: string;
  phone: string;
  numOfResponse: string;
  loadingPoint: string;
  unloadingPoint: string;
  vehicleType: string;
  fuelType: string;
  bodyType: string;
  material: string;
  weight: string;
  targetPrice: string;
  numOfBidder: string;
  bidRemaining: string;
  requestDate: string | null;
  expiryDate: string | null;
  remarks: string;
}

export default function BidForm() {
  // State for each form field
  const navigate = useNavigate();
  const [loadingDate, setLoadingDate] = useState<string | null>(null);
  const [requestDate, setRequestDate] = useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState<string | null>(null);
  const [bidNo, setBidNo] = useState<string>("");
  const [createPerson, setCreatePerson] = useState<string>("");
  const [assignedStaff, setAssignedStaff] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [numOfResponse, setNumOfResponse] = useState<string>("");
  const [loadingPoint, setLoadingPoint] = useState<string>("");
  const [unloadingPoint, setUnloadingPoint] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [fuelType, setFuelType] = useState<string>("");
  const [bodyType, setBodyType] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [targetPrice, setTargetPrice] = useState<string>("");
  const [numOfBidder, setNumOfBidder] = useState<string>("");
  const [bidRemaining, setBidRemaining] = useState<string>("");
  const [remarks, setRemarks] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const existingBids: BidData[] = JSON.parse(localStorage.getItem("bids") || "[]");

    console.log(existingBids)

    // Create an object to store the form data
    const bidData: BidData = {
      id: existingBids.length + 1,
      bidNo,
      createPerson,
      assignedStaff,
      phone,
      numOfResponse,
      loadingPoint,
      unloadingPoint,
      vehicleType,
      fuelType,
      bodyType,
      material,
      weight,
      targetPrice,
      numOfBidder,
      bidRemaining,
      requestDate,
      expiryDate,
      remarks,
    };

    // Add the new bid data to the existing bids array
    existingBids.push(bidData);

    // Save the updated array back to local storage
    localStorage.setItem("bids", JSON.stringify(existingBids));

    console.log("Form submitted", bidData);

    // Navigate to the dashboard after the form is submitted
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Create New Bid</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Bid Details */}
            <div className="space-y-2">
              <Form.Label htmlFor="bidNo">Bid No.</Form.Label>
              <input
                required
                id="bidNo"
                value={bidNo}
                onChange={(e) => setBidNo(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="createPerson">Bid Create Person Name</Form.Label>
              <input
                required
                id="createPerson"
                value={createPerson}
                onChange={(e) => setCreatePerson(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Vehicle Loading Date */}
            <div className="space-y-2 relative">
              <Form.Label>Vehicle Loading Date</Form.Label>
              <div className="flex items-center border rounded-md p-2">
                <CalendarIcon className="mr-2 text-gray-500" />
                <input
                  required
                  type="date"
                  value={loadingDate || ""}
                  onChange={(e) => setLoadingDate(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Other fields remain the same */}
            <div className="space-y-2">
              <Form.Label htmlFor="assignedStaff">Assigned Staff</Form.Label>
              <input
                required
                id="assignedStaff"
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="phone">Phone Number</Form.Label>
              <input
                required
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="numOfResponse">No. of Response</Form.Label>
              <input
                required
                id="numOfResponse"
                value={numOfResponse}
                onChange={(e) => setNumOfResponse(e.target.value)}
                type="number"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="loadingPoint">Loading Point</Form.Label>
              <input
                required
                id="loadingPoint"
                value={loadingPoint}
                onChange={(e) => setLoadingPoint(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="unloadingPoint">Unloading Point</Form.Label>
              <input
                required
                id="unloadingPoint"
                value={unloadingPoint}
                onChange={(e) => setUnloadingPoint(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Vehicle Type (Radio Group) */}
            <div className="space-y-2">
              <Form.Label>Vehicle Type</Form.Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    required
                    type="radio"
                    name="vehicleType"
                    value="truck"
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                  <span>Truck</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    required
                    type="radio"
                    name="vehicleType"
                    value="bus"
                    onChange={(e) => setVehicleType(e.target.value)}
                  />
                  <span>Bus</span>
                </label>
              </div>
            </div>

            {/* Fuel Type (Dropdown) */}
            <div className="space-y-2 relative">
              <Form.Label>Fuel Type</Form.Label>
              <div className="relative w-full border rounded-md p-2 flex items-center">
                <select
                  required
                  className="w-full appearance-none bg-transparent focus:outline-none"
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value)}
                >
                  <option value="">Select fuel type</option>
                  <option value="petrol">Petrol</option>
                  <option value="diesel">Diesel</option>
                  <option value="cng">CNG</option>
                  <option value="ev">EV</option>
                </select>
                <ChevronDown className="absolute right-2 text-gray-500" />
              </div>
            </div>

            {/* Body Type (Radio Group) */}
            <div className="space-y-2">
              <Form.Label>Body Type</Form.Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    required
                    type="radio"
                    name="bodyType"
                    value="open"
                    onChange={(e) => setBodyType(e.target.value)}
                  />
                  <span>Open Body</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    required
                    type="radio"
                    name="bodyType"
                    value="closed"
                    onChange={(e) => setBodyType(e.target.value)}
                  />
                  <span>Closed Body</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="material">Material</Form.Label>
              <input
                required
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="weight">Weight (In kg)</Form.Label>
              <input
                required
                id="weight"
                type="number"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="targetPrice">Target Price (₹)</Form.Label>
              <input
                required
                id="targetPrice"
                type="number"
                min="0"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="numOfBidder">Number of Bidder</Form.Label>
              <input
                required
                id="numOfBidder"
                type="number"
                min="0"
                value={numOfBidder}
                onChange={(e) => setNumOfBidder(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="space-y-2">
              <Form.Label htmlFor="bidRemaining">Bid Remaining</Form.Label>
              <input
                required
                id="bidRemaining"
                type="number"
                min="0"
                value={bidRemaining}
                onChange={(e) => setBidRemaining(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Request Date */}
            <div className="space-y-2 relative">
              <Form.Label>Request Date</Form.Label>
              <div className="flex items-center border rounded-md p-2">
                <CalendarIcon className="mr-2 text-gray-500" />
                <input
                  required
                  type="date"
                  value={requestDate || ""}
                  onChange={(e) => setRequestDate(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Expiry Date */}
            <div className="space-y-2 relative">
              <Form.Label>Expiry Date</Form.Label>
              <div className="flex items-center border rounded-md p-2">
                <CalendarIcon className="mr-2 text-gray-500" />
                <input
                  required
                  type="date"
                  value={expiryDate || ""}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full focus:outline-none"
                />
              </div>
            </div>

            {/* Remarks */}
            <div className="space-y-2">
              <Form.Label htmlFor="remarks">Remarks</Form.Label>
              <textarea
                required
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="min-h-[100px] w-full p-2 border rounded-md"
              />
            </div>

          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-600 px-8 py-4 rounded-md hover:bg-blue-700"
          >
            Create Bid
          </button>
          </div>
        
        </form>
      </div>
    </div>
  );
}
