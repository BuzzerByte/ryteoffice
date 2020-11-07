<?php

namespace App\Http\Controllers\Api\V1;

use App\Client;
use Illuminate\Http\UploadedFile;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use App\Services\ClientService;
use Response;

class ClientController extends Controller
{
    const ITEM_PER_PAGE = 15;
    protected $clients;

    public function __construct(ClientService $clients){
        $this->clients = $clients;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): JsonResponse
    {
        
        return response()->json($this->paginatedQuery($request));
        // $searchParams = $request->all();
        // $userQuery = Client::query();
        // $limit = Arr::get($searchParams, 'limit', static::ITEM_PER_PAGE);
        // $role = Arr::get($searchParams, 'role', '');
        // $keyword = Arr::get($searchParams, 'keyword', '');
        
        // if (!empty($role)) {
        //     $userQuery->whereHas('roles', function($q) use ($role) { $q->where('name', $role); });
           
        // }
        
        // if (!empty($keyword)) {
        //     $userQuery->where('name', 'LIKE', '%' . $keyword . '%');
        //     $userQuery->where('email', 'LIKE', '%' . $keyword . '%');
            
        // }
       
        // return ClientResource::collection($userQuery->paginate($limit));
    }
    /**
     * Get the paginated resource query.
     *
     * @param Illuminate\Http\Request
     *
     * @return Illuminate\Pagination\LengthAwarePaginator
     */
    protected function paginatedQuery(Request $request) : LengthAwarePaginator
    {
        $clients = Client::orderBy(
            $request->input('sortBy') ?? 'name',
            $request->input('sortType') ?? 'ASC'
        );

        // if ($type = $request->input('type')) {
        //     $this->filter($clients, 'type', $type);
        // }

        if ($name = $request->input('name')) {
            $this->filter($clients, 'name', $name);
        }

        if ($email = $request->input('email')) {
            $this->filter($clients, 'email', $email);
        }

        return $clients->paginate($request->input('perPage') ?? 10);
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
    public function store(Request $request): JsonResponse
    {
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
        $result = $this->clients->store($request);

        // return redirect()->route('client.index');
        // $client = Client::create([
        //     'name' => $request->input('name'),
        //     'company' => $request->input('company'),
        //     'phone' => $request->input('phone'),
        //     'email' => $request->input('email'),
        //     'billing_address' => $request->input('billing_address'),
        //     'shipping_address' => $request->input('shipping_address'),
        //     'fax' => $request->input('fax'),
        //     'open_balance' => $request->input('open_balance'),
        //     'website' => $request->input('website'),
        //     'note' => $request->input('note'),
        // ]);

        return response()->json($result['client'], 201);
        // sleep(1);
        // $params = $request->all();
        // $user = Client::create([
        //     'name' => $params['name'],
        //     'email' => $params['email'],
        //     'company' => $params['company'],
        //     'phone' => $params['phone'],
        //     'open_balance' => $params['open_balance'],
        //     'fax' => $params['fax'],
        //     'website' => $params['website'],
        //     'billing_address' => $params['billing_address'],
        //     'shipping_address' => $params['shipping_address'],
        //     'note' => $params['note'],
        // ]);
        // return new ClientResource($user);
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
     * Show a resource.
     *
     * @param Illuminate\Http\Request $request
     * @param App\client $client
     *
     * @return Illuminate\Http\JsonResponse
     */
    public function show(Request $request,Client $client) : JsonResponse
    {
        return response()->json($client);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Client $client)
    {
        //
        return new ClientResource($user);
        $data = Client::where('id',$client->id)->get();
        return response()->json(['client'=>$data]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
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

        $attributes = $request->all();
        unset($attributes['step']);

        $client->fill($attributes);
        $client->update();

        return response()->json($client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
        try {
            $client->delete();
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
