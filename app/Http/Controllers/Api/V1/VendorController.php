<?php

namespace App\Http\Controllers\Api\V1;

use App\Vendor;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Api\V1\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Services\VendorService;
use Response;

class VendorController extends Controller
{
    protected $vendors;

    public function __construct(VendorService $vendors)
    {
        $this->vendors = $vendors;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
    //
        return response()->json($this->paginatedQuery($request));
    }

    protected function paginatedQuery(Request $request) : LengthAwarePaginator
    {
        $vendors = Vendor::orderBy(
            $request->input('sortBy') ?? 'name',
            $request->input('sortType') ?? 'ASC'
        );

        // if ($type = $request->input('type')) {
        //     $this->filter($clients, 'type', $type);
        // }

        if ($name = $request->input('name')) {
            $this->filter($vendors, 'name', $name);
        }

        if ($email = $request->input('email')) {
            $this->filter($vendors, 'email', $email);
        }

        return $vendors->paginate($request->input('perPage') ?? 10);
    }

    protected function filter($clients, string $property, array $filters)
    {
        foreach ($filters as $keyword => $value) {
            // Needed since LIKE statements requires values to be wrapped by %
            if (in_array($keyword, ['like', 'nlike'])) {
                $clients->where(
                    $property,
                    _to_sql_operator($keyword),
                    "%{$value}%"
                );

                return;
            }

            $clients->where($property, _to_sql_operator($keyword), "{$value}");
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required_if:step,0|string|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
                //'nullable|date:Y-m-d|before:'.now()->subYear(10)->format('Y-m-d'),
            'billing_address' => 'nullable|string|max:510',
            'shipping_address' => 'nullable|string|max:510',
            'fax' => 'nullable|string|max:255',
            'open_balance' => 'nullable|string|max:255',
            'note' =>'nullable|string|max:255',
            'website'=>'nullable|string|max:255',
        ]);

        // Return here if the user is just in the first step.
        if ($request->input('step') === 0) {
            return response()->json(200);
        }
        if ($request->input('step') === 1) {
            return response()->json(200);
        }

        $result = $this->vendors->store($request);

        return response()->json($result['vendor'], 201);
    }

    public function downloadClientSample(){
        // Check if file exists in app/storage/file folder
        $file_path = storage_path() . "/app/downloads/client.csv";
        $headers = array(
            'Content-Type: csv',
            'Content-Disposition: attachment; filename=client.csv',
        );
        if (file_exists($file_path)) {
            // Send Download
            flash()->success('File Downloaded');
            // Session::flash('success', 'File Downloaded');
            return Response::download($file_path, 'client.csv', $headers);
        } else {
            // Error
            flash()->error('Something went wrong!');
            // Session::flash('failure', 'Something went wrong!');
        }
        $clients = Client::all();
        return redirect()->route('client.index',['clients'=>$clients]);
    }

    public function import(Request $request){
        $this->validate($request, array(
            'import_file'      => 'required'
        ));
        $client_name = [];
        if ($request->hasFile('import_file')) {
            $extension = File::extension($request->import_file->getClientOriginalName());
            if ($extension == "csv") {
                $path = $request->import_file->getRealPath();
                $data = Excel::load($path, function($reader) {})->get();
                if(!empty($data) && $data->count()){
                    foreach($data as $record){
                        if(in_array($record->client_name,$client_name)){
                            continue;   
                        }else if(Client::where('name','=',$record->client_name)->exists()){
                            continue;
                        }else if($record->client_name == NULL || $record->client_name == "-"){
                            continue;
                        }else{
                            $client_name[] = $record->client_name;
                            $insert_client_data[] = [
                                'name' => $record->client_name, 
                                'company' => $record->company,
                                'phone' => $record->phone,
                                'fax' => $record->fax,
                                'email' => $record->email,
                                'website' => $record->website,
                                'billing_address' => $record->billing_address,
                                'shipping_address' => $record->shipping_address,
                                'note' => $record->note
                            ];
                        }
                    }
                    if(!empty($insert_client_data)){
                        $insert_client = DB::table('clients')->insert($insert_client_data);
                        flash()->success('Clients Data Imported!');
                        // Session::flash('success', 'Clients Data Imported!');
                    }else{
                        flash()->warning('Duplicated record, please check your csv file!');
                        // Session::flash('warning', 'Duplicated record, please check your csv file!');
                    }
                }else{
                    flash()->warning('There is no data in csv file!');
                    // Session::flash('warning', 'There is no data in csv file!');
                }
            }else{
                flash()->warning('Selected file is not csv!');
                // Session::flash('warning', 'Selected file is not csv!');
            }
        }else{
            flash()->error('Something went wrong!');
            // Session::flash('failure', 'Something went wrong!');
        }
        $clients = Client::all();
        return redirect()->route('client.index',['clients'=>$clients]);    
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Vendor $vendor):JsonResponse
    {
        //
        return response()->json($vendor);
    }

    public function downloadVendorSample(){
        // Check if file exists in app/storage/file folder
        $file_path = storage_path() . "/app/downloads/vendor.csv";
        $headers = array(
            'Content-Type: csv',
            'Content-Disposition: attachment; filename=vendor.csv',
        );
        if (file_exists($file_path)) {
            // Send Download
            flash()->success('File Downloaded');
            return Response::download($file_path, 'vendor.csv', $headers);
        } else {
            // Error
            flash()->error('Something went wrong!');
        }
        $vendors = Vendor::all();
        return redirect()->route('vendor.index',['vendors'=>$vendors]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function edit(Vendor $vendor)
    {
        //
        return new VenrdorResource($vendor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vendor $vendor)
    {
        //
        $request->validate([
            'name' => 'required_if:step,0|string|max:255',
            'company' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|string|max:255',
                //'nullable|date:Y-m-d|before:'.now()->subYear(10)->format('Y-m-d'),
            'billing_address' => 'nullable|string|max:510',
            'shipping_address' => 'nullable|string|max:510',
            'fax' => 'nullable|string|max:255',
            'open_balance' => 'nullable|string|max:255',
            'note' =>'nullable|string|max:255',
            'website'=>'nullable|string|max:255',
        ]);
        $result = $this->vendors->update($request, $vendor);
        // $attributes = $request->all();
        // unset($attributes['step']);

        // $client->fill($attributes);
        // $client->update();

        return response()->json($result['vendor'], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Vendor  $vendor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vendor $vendor)
    {
        //
        try {
            $vendor->delete();
        } catch (\Exception $ex) {
            response()->json(['error' => $ex->getMessage()], 403);
        }

        return response()->json(null, 204);
    }

    /**
     * Get permissions from role
     *
     * @param User $user
     * @return array|\Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function permissions(User $user)
    {
        try {
            return new JsonResponse([
                'user' => PermissionResource::collection($user->getDirectPermissions()),
                'role' => PermissionResource::collection($user->getPermissionsViaRoles()),
            ]);
        } catch (\Exception $ex) {
            response()->json(['error' => $ex->getMessage()], 403);
        }
    }

    /**
     * @param bool $isNew
     * @return array
     */
    private function getValidationRules($isNew = true)
    {

        return [
            'name' => 'required',
            'email' => $isNew ? 'required|email|unique:users' : 'required|email',
            'roles' => [
                'required',
                'array'
            ],
        ];
    }
}
