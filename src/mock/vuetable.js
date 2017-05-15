export const vuetable = [
    {
        path: '/api/table',
        data: {
            'data|10':[{
                'date':'@date',
                'name':'@cname',
                'address':'@county(ture)',
                'logo':'@image("24x24",@color,@cfirst)'
            }]
        }
    }
]